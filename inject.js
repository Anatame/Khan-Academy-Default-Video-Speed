if (document.readyState === "complete") {
    initializeNow();
} else {
    document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        initializeNow();
    }
    };
}

function initializeNow(){
    if(inIframe()){
        if(document.referrer == "https://www.khanacademy.org/"){
            speedUp()
            console.log("Changed")
        }
    }
}

chrome.runtime.onMessage.addListener(
    function(request) {
      if (request.toggle === "toggle"){
          speedUp()
      }
    }
);

function speedUp(){
    
    let vid = document.querySelector("video")
    chrome.storage.sync.get(['speed'], function(result) {
        if(result.speed != undefined){
            vid.playbackRate = result.speed
        } else{
            vid.playbackRate = 1
        }
      });

    console.log(vid.playbackRate)

}

function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }