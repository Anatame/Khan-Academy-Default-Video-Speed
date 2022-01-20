const toggleBtn = document.getElementById('toggleBtn');
const speed = document.getElementById("speedInput")

chrome.storage.sync.get(['speed'], function(result) {
  if(result.speed != undefined){
    speed.value = result.speed
  } else{
    speed.value = 1
  }
});

toggleBtn.addEventListener('click', function(){
  chrome.storage.sync.set({speed: speed.value}, function() {
    console.log('Value is set to ' +  speed.value);
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {toggle: "toggle"})
  });
})

