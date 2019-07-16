const remote = require('electron').remote;
let $ = require('jquery');

(() => {
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    }
    
    function init() {   
        let win = remote.getCurrentWindow();
        
        let togMax = () => {
            win.isMaximized()?
                $(".icon-toggle").removeClass("icon-max").addClass("icon-unmax"):
                $(".icon-toggle").removeClass("icon-unmax").addClass("icon-max");
        }

        const minBtn = document.getElementById("minimize-window");
        const maxToggleBtn = document.getElementById("maximize-toggle-window");
        const closeBtn = document.getElementById("close-window");

        minBtn.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.minimize();
        });

        maxToggleBtn.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.isMaximized()?win.unmaximize():win.maximize();
            togMax();
        });

        closeBtn.addEventListener("click", event => {
            win = remote.getCurrentWindow();
            win.close();
        });

        togMax();
        win.on("maximize", togMax);
        win.on("unmaximize", togMax);
    }
})();
