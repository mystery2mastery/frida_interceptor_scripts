Interceptor.attach(Module.getExportByName(null, "LoadLibraryA"), {
  onEnter: function (args) {
    // Function: LoadLibraryA
    console.log("\n[+] LoadLibraryA:");
    // LPCSTR lpLibFileName
    console.log("\tlpLibFileName: " + args[0].readAnsiString());

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});