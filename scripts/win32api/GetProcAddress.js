Interceptor.attach(Module.getExportByName(null, "GetProcAddress"), {
  onEnter: function (args) {
    // Function: GetProcAddress
    console.log("\n[+] GetProcAddress:");
    // HMODULE hModule
    console.log("\thModule: " + args[0]);
    // LPCSTR lpProcName
    console.log("\tlpProcName: " + args[1].readAnsiString());

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});