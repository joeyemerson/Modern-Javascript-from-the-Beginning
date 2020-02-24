function easyHTTP() {
  this.http = new XMLHttpRequest();
}

// Make an HTTP GET Request
easyHTTP.prototype.get = function(url, callback) {
  const self = this;

  self.http.open('GET', url, true);

  self.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, self.http.responseText);
    } else {
      callback('Error: ' + self.http.status);
    }
  };

  self.http.send();
};

// Make an HTTP POST Request
easyHTTP.prototype.post = function(url, data, callback) {
  const self = this;

  self.http.open('POST', url, true);

  self.http.setRequestHeader('Content-type', 'application/json');

  self.http.onload = function() {
    callback(null, self.http.responseText);
  };

  self.http.send(JSON.stringify(data));
};

// Make an HTTP PUT Request
easyHTTP.prototype.put = function(url, data, callback) {
  const self = this;

  self.http.open('PUT', url, true);

  self.http.setRequestHeader('Content-type', 'application/json');

  self.http.onload = function() {
    callback(null, self.http.responseText);
  };

  self.http.send(JSON.stringify(data));
};

// Make an HTTP DELETE Request
easyHTTP.prototype.delete = function(url, callback) {
  const self = this;

  self.http.open('DELETE', url, true);

  self.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, 'Post Deleted');
    } else {
      callback('Error: ' + self.http.status);
    }
  };

  self.http.send();
};
