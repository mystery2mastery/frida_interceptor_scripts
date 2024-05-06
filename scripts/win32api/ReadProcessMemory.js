Interceptor.attach(Module.getExportByName(null, "ReadProcessMemory"), {
  onEnter: function (args) {
    // Function: ReadProcessMemory
    console.log("\n[+] ReadProcessMemory:");
    // HANDLE hProcess
    console.log("\thProcess: " + args[0]);
	
	GetProcessId_native(args[0])
	.then(pid => console.log('Process ID (read from):', pid))
	.catch(error => console.error('Error:', error));

	GetProcessImageFileNameW_native(args[0])
	.then(processName => console.log('Process Name (read from):', processName))
	.catch(error => console.error('Error:', error));
    
	// LPCVOID lpBaseAddress
    console.log("\tlpBaseAddress (read from this addr): " + args[1]);
	console.log(hexdump(args[1], {offset: 0, length: parseInt(args[3], 16), header: true, ansi: false}));
    // LPVOID lpBuffer
    this.lpBuffer = args[2];
	console.log("\t[out] lpBuffer (to addr): " + args[2]);
    // SIZE_T nSize
	this.Size = args[3];
    console.log("\tnSize: " + args[3]);
    // SIZE_T *lpNumberOfBytesRead
	if (args[4] != 0){
		console.log("\t[out] lpNumberOfBytesRead: " + ptr(args[4]).readPointer().toString(16));
	}
	else{
		console.log("\t[out] lpNumberOfBytesRead: NULL = argument not specified");
	}
    

  },
  onLeave: function (retval) {    
	console.log("\tlpBuffer contents after execution:\n", hexdump(this.lpBuffer, {offset: 0, length: parseInt(this.Size, 16), header: true, ansi: false}));
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