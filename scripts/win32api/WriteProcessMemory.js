Interceptor.attach(Module.getExportByName(null, "WriteProcessMemory"), {
  onEnter: function (args) {
    // Function: WriteProcessMemory
    console.log("\n[+] WriteProcessMemory:");
    // HANDLE hProcess
    console.log("\thProcess: " + args[0]);
	
	GetProcessId_native(args[0])
	.then(pid => console.log('Process ID (write to):', pid))
	.catch(error => console.error('Error:', error));
    
	GetProcessImageFileNameW_native(args[0])
	.then(processName => console.log('Process Name (write to):', processName))
	.catch(error => console.error('Error:', error));	
	
	// LPVOID lpBaseAddress
    this.lpBaseAddress = args[1];
	console.log("\tlpBaseAddress (write to this addr): " + args[1]);
	// console.log(hexdump(args[1], {offset: 0, length: 32, header: true, ansi: false}));
    // LPCVOID lpBuffer
    console.log("\tlpBuffer (from addr): " + args[2]);
	console.log(hexdump(args[2], {offset: 0, length: parseInt(args[3], 16), header: true, ansi: false}));
    // SIZE_T nSize
    this.Size = args[3];
	console.log("\tnSize: " + args[3]);
    // SIZE_T *lpNumberOfBytesWritten
	if (args[4] != 0){
		console.log("\t[out] lpNumberOfBytesWritten: " + ptr(args[4]).readPointer().toString(16));
	}
	else{
		console.log("\t[out] lpNumberOfBytesWritten: NULL = argument not specified");
	}
    

  },
  onLeave: function (retval) {       
    console.log("\tlpBaseAddress contents after execution:\n", hexdump(this.lpBaseAddress, {offset: 0, length: parseInt(this.Size, 16), header: true, ansi: false}));
	console.log("Return value: " + retval);
  }
});

// get pid from process handle
//support
async function GetProcessId_native(handle) {
	var GetProcessId_ptr = Module.findExportByName(null, 'GetProcessId');
	var GetProcessId_call = new NativeFunction(GetProcessId_ptr, 'int', ['pointer']);	
	let pid = GetProcessId_call(handle);
    return pid;
}
//support

// get process name from process handle
//support
async function GetProcessImageFileNameW_native(handle){

    const  GetProcessImageFileNameW_ptr = Module.findExportByName(null, 'GetProcessImageFileNameW');
	const  GetProcessImageFileNameW_call = new NativeFunction(GetProcessImageFileNameW_ptr, 'uint32', ['pointer', 'pointer', 'uint32']);

	// Allocate memory to store the process image file name
    const MAX_PATH = 260; // Maximum length of a path
    const lpImageFileName = Memory.alloc(MAX_PATH * 2); // Allocate space for a wide string (UTF-16)
    
	// Get the process image file name associated with the process handle
    const result = GetProcessImageFileNameW_call(handle, lpImageFileName, MAX_PATH);
	
    // Read the process image file name from memory
    const processImageFileName = lpImageFileName.readUtf16String();

    // Extract the process name from the file name
    const processName = processImageFileName.split('\\').pop();

    return processName;
	
}
//support