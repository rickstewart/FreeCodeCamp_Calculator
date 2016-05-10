/**
 * Created by Rick Stewart on 1/8/2016.
 */
var main = function () {
    "use strict";

    /* get references to display fields */
    var xStackDisplay = document.getElementById('X-display-target');
    var yStackDisplay = document.getElementById('Y-display-target');
    var zStackDisplay = document.getElementById('Z-display-target');

    /* define stack accumulators */
    var x_Accumulator = 0;
    var y_Accumulator = 0;
    var z_Accumulator = 0;

    /* define scratchpad work area variable */
    var scratchpad = [];

    /* define flag to track last scratchpad operation, operand (true) or operator (false) */
    var lastScratchpadAccessType = true;

    /* accumulator getters and setters */
    var setX_Accumulator = function (num) {
        x_Accumulator = num;
    };

    var setY_Accumulator = function (num) {
        y_Accumulator = num;
    };

    var setZ_Accumulator = function (num) {
        z_Accumulator = num;
    };

    var getX_Accumulator = function () {
        return x_Accumulator;
    };

    var getY_Accumulator = function () {
        return y_Accumulator;
    };

    var getZ_Accumulator = function () {
        return z_Accumulator;
    };

    /* scratchpad last access type, getter and setter */
    var setScratchpadLastAccessType = function (bool) {
        lastScratchpadAccessType = bool;
    };

    var getScratchpadLastAccessType = function () {
        return lastScratchpadAccessType;
    };

    /* update methods for refresh of x, y, and z display fields */
    var update_Display = function () {
        xStackDisplay.innerText = getX_Accumulator().toFixed(5);
        yStackDisplay.innerText = getY_Accumulator().toFixed(5);
        zStackDisplay.innerText = getZ_Accumulator().toFixed(5);
    };

    /* initialize accumulators to zero at start of program, update display. */
    setX_Accumulator(0);
    setY_Accumulator(0);
    setZ_Accumulator(0);
    update_Display();

    /* method to add value to scratchpad array */
    var enterNumericToScratchpad = function (value) {
        if (getScratchpadLastAccessType()) {
            scratchpad.push(value);
        }
        else {
            setZ_Accumulator(getY_Accumulator());
            setY_Accumulator(getX_Accumulator());
            clearScratchpad();
            setX_Accumulator(0);
            scratchpad.push(value);
        }
        setScratchpadLastAccessType(true);
    };

    /* clear scratchpad array to initial state. */
    var clearScratchpad = function () {
        scratchpad = [];
        setScratchpadLastAccessType(true);
    };

    /* method to move scratchpad data into x accumulator and update display*/
    var scratchpadToX_Display = function () {
        var num = parseFloat(scratchpad.join(""));
        setX_Accumulator(num);
        update_Display();
    };

    /* basic math methods */
    var addX_Y = function () {
        var temp = getX_Accumulator() + getY_Accumulator();
        setScratchpadLastAccessType(false);
        setY_Accumulator(getZ_Accumulator());
        setZ_Accumulator(0);
        setX_Accumulator(temp);
        update_Display();
    };
    var subtractX_Y = function () {
        var temp = getY_Accumulator() - getX_Accumulator();
        setScratchpadLastAccessType(false);
        setY_Accumulator(getZ_Accumulator());
        setZ_Accumulator(0);
        setX_Accumulator(temp);
        update_Display();
    };
    var multiplyX_Y = function () {
        var temp = getX_Accumulator() * getY_Accumulator();
        setScratchpadLastAccessType(false);
        setY_Accumulator(getZ_Accumulator());
        setZ_Accumulator(0);
        setX_Accumulator(temp);
        update_Display();
    };
    var divideX_Y = function () {
        var temp = getY_Accumulator() / getX_Accumulator();
        setScratchpadLastAccessType(false);
        setY_Accumulator(getZ_Accumulator());
        setZ_Accumulator(0);
        setX_Accumulator(temp);
        update_Display();
    };

    /* misc. math functions */
    var oneOverX = function () {
        setX_Accumulator(1 / getX_Accumulator());
        clearScratchpad();
        setScratchpadLastAccessType(false);
        update_Display();
    };

    var yToX = function () {
        var temp = Math.pow(getY_Accumulator(), getX_Accumulator());
        setScratchpadLastAccessType(false);
        setY_Accumulator(getZ_Accumulator());
        setZ_Accumulator(0);
        setX_Accumulator(temp);
        update_Display();
    };

    var xSquared = function () {
        setX_Accumulator(getX_Accumulator() * getX_Accumulator());
        clearScratchpad();
        setScratchpadLastAccessType(false);
        update_Display();
    };

    var squareRootOfX = function () {
        setX_Accumulator(Math.sqrt(getX_Accumulator()));
        clearScratchpad();
        setScratchpadLastAccessType(false);
        update_Display();
    };

    var xSwapY = function () {
        var temp = getX_Accumulator();
        setX_Accumulator(getY_Accumulator());
        setY_Accumulator(temp);
        clearScratchpad();
        setScratchpadLastAccessType(false);
        update_Display();
    };

    var changeSignX = function () {
        setX_Accumulator(getX_Accumulator() * (-1));
        clearScratchpad();
        setScratchpadLastAccessType(false);
        update_Display();
    };

    /* methods to capture keystrokes, and carry out the task. "public exposed methods" */
    return {
        captureNumKey: function (value) {
            enterNumericToScratchpad(value);
            scratchpadToX_Display();
        },
        captureEnterKey: function () {
            setZ_Accumulator(getY_Accumulator());
            setY_Accumulator(getX_Accumulator());
            setScratchpadLastAccessType(false);
            clearScratchpad();
            update_Display();
        },
        captureClearKey: function () {
            setX_Accumulator(0);
            setY_Accumulator(0);
            setZ_Accumulator(0);
            clearScratchpad();
            update_Display();
        },
        captureClearX_Key: function () {
            setX_Accumulator(0);
            clearScratchpad();
            update_Display();
        },
        captureAdditionKey: function () {
            addX_Y();
        },
        captureSubtractionKey: function () {
            subtractX_Y();
        },
        captureMultiplicationKey: function () {
            multiplyX_Y();
        },
        captureDivisionKey: function () {
            divideX_Y();
        },
        captureOneOverX_Key: function () {
            oneOverX();
        },
        captureY_ToX_Key: function () {
            yToX();
        },
        captureX_SquaredKey: function () {
            xSquared();
        },
        captureSquareRootOfX_Key: function () {
            squareRootOfX();
        },
        captureX_SwapY_Key: function () {
            xSwapY();
        },
        captureChangeSignKey: function () {
            changeSignX();
        }
    };
}();

