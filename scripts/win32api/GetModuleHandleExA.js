Interceptor.attach(Module.getExportByName(null, "GetModuleHandleExA"), {
  onEnter: function (args) {
    // Function: GetModuleHandleExA
    console.log("\n[+] GetModuleHandleExA:");
    // DWORD dwFlags
    console.log("\tdwFlags: " + args[0] + " (" + resolve_GetModuleHandle_dwFlags(args[0].toInt32()) + ")");
    // LPCSTR lpModuleName
	if (args[0].toInt32()){ 
		console.log("\tlpModuleName: " + args[1]);
		console.log(hexdump(args[1], {offset: 0, length: 32, header: true, ansi: false}));
	}else{ // if dwFlags == 0 then it is normal.
		console.log("\tlpModuleName: " + args[1].readAnsiString());
	}
    // HMODULE *phModule
    console.log("\t*phModule: " + args[2]);

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});

//support
function resolve_GetModuleHandle_dwFlags(dwFlags) {
  const flags = {
	GET_MODULE_HANDLE_EX_FLAG_PIN: 0x00000001,
	GET_MODULE_HANDLE_EX_FLAG_UNCHANGED_REFCOUNT: 0x00000002,
	GET_MODULE_HANDLE_EX_FLAG_FROM_ADDRESS: 0x00000004,
	};

  return Object.keys(flags).filter(flag => (dwFlags & flags[flag])).join(" | ");
}
//support