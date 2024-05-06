Interceptor.attach(Module.getExportByName(null, "GetModuleHandleW"), {
  onEnter: function (args) {
    // Function: GetModuleHandleW
    console.log("\n[+] GetModuleHandleW:");
    // LPCWSTR lpModuleName
    console.log("\tlpModuleName: " + args[0].readUtf16String());

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});