Interceptor.attach(Module.getExportByName(null, "VirtualProtectEx"), {
  onEnter: function (args) {
    // Function: VirtualProtectEx
    console.log("\n[+] VirtualProtectEx:");
    // HANDLE hProcess
    console.log("\thProcess: " + args[0]);
    // LPVOID lpAddress
    console.log("\tlpAddress: " + args[1]);
    // SIZE_T dwSize
    console.log("\tdwSize: " + args[2]);
    // DWORD flNewProtect
    console.log("\tflNewProtect: " + args[3] + " (" + resolve_flProtect(args[3].toInt32()) + ")");
    // PDWORD lpflOldProtect
    console.log("\tlpflOldProtect: " + args[4]);

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});

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