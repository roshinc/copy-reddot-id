// Saves options to chrome.storage
function save_options() {
  var vCopy = document.getElementById('vcopy').checked;
  var rAlert = document.getElementById('ralert').checked;
  chrome.storage.sync.set({
    verboseCopying: vCopy,
    redAlert: rAlert
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHTML  = '<br /><span class="label label-success">Options saved.</span>';
    setTimeout(function() {
      status.innerHTML = '';
    }, 750);
  });
}

// Restores checkboxs state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get({
    verboseCopying: false,
    redAlert: true
  }, function(items) {
    document.getElementById('vcopy').checked = items.verboseCopying;
    document.getElementById('ralert').checked = items.redAlert;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);