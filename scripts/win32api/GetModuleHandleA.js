Interceptor.attach(Module.getExportByName(null, "GetModuleHandleA"), {
  onEnter: function (args) {
    // Function: GetModuleHandleA
    console.log("\n[+] GetModuleHandleA:");
    // LPCSTR lpModuleName
    console.log("\tlpModuleName: " + args[0].readAnsiString());

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});