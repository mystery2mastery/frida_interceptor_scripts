Interceptor.attach(Module.getExportByName(null, "LoadLibraryW"), {
  onEnter: function (args) {
    // Function: LoadLibraryW
    console.log("\n[+] LoadLibraryW:");
    // LPCWSTR lpLibFileName
    console.log("\tlpLibFileName: " + args[0].readUtf16String());

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});