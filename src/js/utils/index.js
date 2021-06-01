export function $(target) {
	return document.querySelector(target);
}
export function $$(target) {
	return document.querySelectorAll(target);
}

export function addEvent(targets, eventName, eventFn){
	targets.forEach(function(target){
		target.addEventListener(eventName, eventFn);
	})
}

