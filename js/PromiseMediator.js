// XXX: This currently depends on jQuery for deferred objects.
var PromiseMediator;

(function(){
  function PrivatePromiseMediator(strType){
    this.type = strType;
    this.object = null;
    this.boundArgs = arguments.slice(1);
  }

  PromiseMediator = function(){
    var privateMediator = new PrivatePromiseMediator(arguments);
    this.call = function(){
      return privateMediator.call(arguments);
    }
  }
  
  PrivatePromiseMediator.prototype.call = function(){
    var that = this;
    var deferred = $.Deferred();
    if(!this.type || arguments.length < 1 || !arguments[0] || !this.object || !this.object[arguments[0]]){
      deferred.reject();
    } else {
      var aOldArgs = arguments.slice(1);
      deferred.then(function(){
        if(!this.object) {
          var argsClone = that.boundArgs.slice(0);
          argsClone.unshift(this.type);
          // TODO: Finish implementation
          return PromisableFactory.createPromisable.apply(null,argsClone).done(function(){
            return that.object[arguments[0]].apply(that.object,aOldArgs);
          });
        }
        return that.object[arguments[0]].apply(that.object,aOldArgs);
      });
    }
    return deferred.promise();
  }

}());

var PromisableFactory;
(function(){
  var dicPromisable;
  PromisableFactory = new function(){};
  PromisableFactory.setPromisable = function(strName,fPromise){
    dicPromisable[strName] = fPromise;
  };
  PromisableFactory.createPromisable = function(strName){
    return dicPromisable[strName].apply(new Function(),arguments.slice(1));
  };
}());
