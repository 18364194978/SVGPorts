/**
 * Created by gxr on 2017/1/13.
 */
var eventCenter = {
  on: function(eventName, eventCallBack) {
    $('body').on(eventName, function(body, args){
      eventCallBack.apply(null, [].slice.call(arguments,1));
    });
  },
  emit: function(eventName, args) {
    $('body').trigger(eventName, [].slice.call(arguments,1));
  }
};
var $e = eventCenter;
