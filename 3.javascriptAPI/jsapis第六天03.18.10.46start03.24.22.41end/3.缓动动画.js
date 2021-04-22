    function time(obj, target, valuee) {
        clearInterval(obj.target);
        obj.times = setInterval(function() {
            var step = (target - obj.offsetLeft) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.target);
                if (valuee) {
                    valuee();
                }
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 30)
    }