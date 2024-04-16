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

Interceptor.attach(Module.getExportByName(null, "LoadLibraryExA"), {
  onEnter: function (args) {
    // Function: LoadLibraryExA
    console.log("\n[+] LoadLibraryExA:");
    // LPCSTR lpLibFileName
    console.log("\tlpLibFileName: " + args[0].readAnsiString());
    // HANDLE hFile
    console.log("\thFile <reserved>: " + args[1]);
    // DWORD dwFlags
    console.log("\tdwFlags: " + args[2] + " (" + resolve_LoadLibrary_dwFlags(args[2].toInt32()) + ")");

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});

Interceptor.attach(Module.getExportByName(null, "LoadLibraryExW"), {
  onEnter: function (args) {
    // Function: LoadLibraryExW
    console.log("\n[+] LoadLibraryExW:");
    // LPCWSTR lpLibFileName
    console.log("\tlpLibFileName: " + args[0].readUtf16String());
    // HANDLE hFile
    console.log("\thFile <reserved>: " + args[1]);
    // DWORD dwFlags
    console.log("\tdwFlags: " + args[2] + " (" + resolve_LoadLibrary_dwFlags(args[2].toInt32()) + ")");

  },
  onLeave: function (retval) {       
    console.log("Return value: " + retval);
  }
});

function resolve_LoadLibrary_dwFlags(dwFlags) {
  const flags = {
	DONT_RESOLVE_DLL_REFERENCES: 0x00000001,	
	LOAD_LIBRARY_AS_DATAFILE: 0x00000002,
	LOAD_PACKAGED_LIBRARY: 0x00000004,
	LOAD_WITH_ALTERED_SEARCH_PATH: 0x00000008,
	LOAD_IGNORE_CODE_AUTHZ_LEVEL: 0x00000010,
	LOAD_LIBRARY_AS_IMAGE_RESOURCE: 0x00000020,
	LOAD_LIBRARY_AS_DATAFILE_EXCLUSIVE: 0x00000040,
	LOAD_LIBRARY_REQUIRE_SIGNED_TARGET: 0x00000080,
	LOAD_LIBRARY_SEARCH_DLL_LOAD_DIR: 0x00000100,
	LOAD_LIBRARY_SEARCH_APPLICATION_DIR: 0x00000200,	
	LOAD_LIBRARY_SEARCH_USER_DIRS: 0x00000400,
	LOAD_LIBRARY_SEARCH_SYSTEM32: 0x00000800,
	LOAD_LIBRARY_SEARCH_DEFAULT_DIRS: 0x00001000,	
	LOAD_LIBRARY_SAFE_CURRENT_DIRS: 0x00002000,
	LOAD_LIBRARY_SEARCH_SYSTEM32_NO_FORWARDER: 0x00004000,
	LOAD_LIBRARY_OS_INTEGRITY_CONTINUITY: 0x00008000,
	};

  return Object.keys(flags).filter(flag => (dwFlags & flags[flag])).join(" | ");
}