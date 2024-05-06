Interceptor.attach(Module.getExportByName(null, "VirtualAllocEx"), {
  onEnter: function (args) {
    // Function: VirtualAllocEx
    console.log("\n[+] VirtualAllocEx:");
    // HANDLE hProcess
    console.log("\thProcess: " + args[0]);
    // LPVOID lpAddress
    console.log("\tlpAddress: " + args[1]);
    // SIZE_T dwSize
    console.log("\tdwSize: " + args[2]);
    // DWORD flAllocationType
    console.log("\tflAllocationType: " + args[3] + " (" + resolve_flAllocationType(args[3].toInt32()) + ")");
    // DWORD flProtect
    console.log("\tflProtect: " + args[4] + " (" + resolve_flProtect(args[4].toInt32()) + ")");

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});

//support
function resolve_flAllocationType(flAllocationType) {
  const flags = {
    MEM_COMMIT: 0x1000,
    MEM_RESERVE: 0x2000,
    MEM_RESET: 0x80000,
	MEM_RESET_UNDO: 0x1000000,
	MEM_LARGE_PAGES: 0x20000000,
	MEM_PHYSICAL: 0x00400000,
	MEM_TOP_DOWN: 0x00100000,
	MEM_WRITE_WATCH: 0x00200000,
    // Add more flags as needed
  };

  return Object.keys(flags).filter(flag => (flAllocationType & flags[flag])).join(" | ");
}
//support

//support
function resolve_flProtect(flProtect) {
  const flags = {
    PAGE_EXECUTE: 0x10,
    PAGE_EXECUTE_READ: 0x20,
    PAGE_EXECUTE_READWRITE: 0x40,
	PAGE_EXECUTE_WRITECOPY: 0x80,
	PAGE_NOACCESS: 0x01,
	PAGE_READONLY: 0x02,
	PAGE_READWRITE: 0x04,
	PAGE_WRITECOPY: 0x08,
	PAGE_TARGETS_INVALID: 0x40000000,
	PAGE_TARGETS_NO_UPDATE: 0x40000000,
	PAGE_GUARD: 0x100,
	PAGE_NOCACHE: 0x200,
	PAGE_WRITECOMBINE: 0x400,
	
    // Add more flags as needed
  };

  return Object.keys(flags).filter(flag => (flProtect & flags[flag])).join(" | ");	
	
}
//support