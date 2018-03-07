function GithubFollower(formFollower, contentFollower) {
  this._formFollower = formFollower;
  this._contentFollower = contentFollower;
  this._api = "http://127.0.0.1:3000/github-follower?accountName=";
}

GithubFollower.prototype.search = function() {
  if (!this._formFollower.value || this._formFollower.value === "") {
    alert("Please input github account name.");
  } else {
    loader.show();
    this.getFollower(this._api + this._formFollower.value)
        .then(function(data) {
          loader.hide();
          this.show(data);
        }.bind(this))
        .catch(function(err) {
          loader.hide();
          console.error('Augh, there was an error!', err.statusText);
        });
  }
}

GithubFollower.prototype.show = function(data) {
  try {
    var user_follower = JSON.parse(data);
    var content_follower = "";
    for (var i = 0; i < user_follower.length; i++) {
      content_follower += '<tr>' +
                            '<td class="text-center box-avatar"><img src="' + user_follower[i].avatar_url + '" /></td>' +
                            '<td class="text-center">' + user_follower[i].login + '</td>' +
                            '<td class="text-center">' + user_follower[i].html_url + '</td>' +
                          '</tr>';
    }
    this._contentFollower.innerHTML = content_follower;
  } catch (e) {
    console.error(e.status);
  }
}

GithubFollower.prototype.getFollower = function(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

function Loader() {
  this._refsClass = "component-loader";
  this._componentLoader = document.createElement('div');
  this._iconLoader = document.createElement('div');
  this._componentLoader.setAttribute("class", this._refsClass);
  this._iconLoader.setAttribute("class", "loader");
  this._componentLoader.appendChild(this._iconLoader);
}

Loader.prototype.show = function() {
  document.body.appendChild(this._componentLoader);
}

Loader.prototype.hide = function() {
  document.body.removeChild(document.body.querySelector('.' + this._refsClass));
}


/** Application is ready */

document.addEventListener('DOMContentLoaded', function() {
  window.follower = new GithubFollower(document.getElementById('fw-account'), document.getElementById('content-follower'));
  window.loader = new Loader();
});