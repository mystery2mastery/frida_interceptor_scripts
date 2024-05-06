Interceptor.attach(Module.getExportByName(null, "WinExec"), {
  onEnter: function (args) {
    // Function: WinExec
    console.log("\n[+] WinExec:");
    // LPCSTR lpCmdLine
    console.log("\tlpCmdLine: " + args[0].readAnsiString());
    // UINT uCmdShow
    console.log("\tuCmdShow: " + args[1] + " (" + resolve_WinExec_uCmdShow(args[1].toInt32()) + ")");

  },
  onLeave: function (retval) {       
	console.log("Return value: " + retval  + " (" + resolve_WinExec_retval(retval.toInt32()) + ")");
  }
});

//support
function resolve_WinExec_uCmdShow(uCmdShow) {
  const flags = {
    SW_HIDE:             0,
    SW_SHOWNORMAL:       1,
    SW_SHOWMINIMIZED:    2,
    SW_SHOWMAXIMIZED:    3,
    SW_SHOWNOACTIVATE:   4,
    SW_SHOW:             5,
    SW_MINIMIZE:         6,
    SW_SHOWMINNOACTIVE:  7,
    SW_SHOWNA:           8,
    SW_RESTORE:          9,
    SW_SHOWDEFAULT:      10,
    SW_FORCEMINIMIZE:    11,
  };

  const matchingFlag = Object.keys(flags).find(flag => flags[flag] === uCmdShow);
  return matchingFlag ? matchingFlag : uCmdShow.toString();
}
//support

//support
function resolve_WinExec_retval(retval) {
  const flags = {
	ERROR_system_out_of_memory:			0,
	ERROR_BAD_FORMAT_invalid_exe_file:	11,
	ERROR_FILE_NOT_FOUND:    			2,
	ERROR_PATH_NOT_FOUND:				3,
	};
	// return success if return value doesnt match any of these error codes.
  return Object.keys(flags).find(flag => retval === flags[flag]) || "success";
}
//support