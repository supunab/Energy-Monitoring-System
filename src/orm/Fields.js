/**
 * Created by prabod on 12/7/16.
 */

//TODO validate fields

class Field {
    constructor(required = false, defaultVal = null, pk = false, ai = false) {
        this.required = required;
        this.defaultVal = defaultVal;
        this.pk = pk;
        this.ai = ai;

    }
}
export class CharField extends Field {
    constructor(maxLength, required = false, defaultVal = null, pk = false) {
        super(required, defaultVal, pk);
        this.maxLength = maxLength;
        this.char = null;
    }

    set(char) {
        this.char = char;
    }

    get() {
        return this.char;
    }
}


export class IntegerField extends Field {
    constructor(maxLength = null, required = false, defaultVal = null, pk = false, ai = false) {
        super(required, defaultVal, pk, ai);
        this.maxLength = maxLength;
        this.int = null;
    }

    set(int) {
        this.int = parseInt(int);
    }

    get() {
        return this.int;
    }
}

export class FloatField extends Field {
    constructor(maxLength, required = false, defaultVal = null, pk = false) {
        super(required, defaultVal, pk);
        this.maxLength = maxLength;
        this.float = null;
    }

    set(float) {
        this.float = parseFloat(float);
    }

    get() {
        return this.float;
    }
}

export class BooleanField extends Field {
    constructor(required = false, defaultVal = null) {
        super(required, defaultVal);
        this.boolean = null;
    }

    set(boolean) {
        this.boolean = boolean;
    }

    get() {
        return this.boolean;
    }
}

export class DateField extends Field {
    constructor(required = false, defaultVal = null) {
        super(required, defaultVal);
        this.date = null;
    }

    set(date) {
        this.date = date;
    }

    get() {
        return this.date;
    }
}

export class DateTimeField extends Field {
    constructor(required = false, defaultVal = null) {
        super(required, defaultVal);
        this.dateTime = null;
    }

    set(dateTime) {
        this.dateTime = dateTime;
    }

    get() {
        return this.dateTime;
    }
}

export class TimeStampField extends Field {
    constructor(required = false, defaultVal = null) {
        super(required, defaultVal);
        this.timeStamp = null;
    }

    set(timeStamp) {
        this.timeStamp = timeStamp;
    }

    get() {
        return this.timeStamp;
    }
}

export class TextField extends Field {
    constructor(required = false, defaultVal = null) {
        super(required, defaultVal);
        this.text = null;
    }

    set(text) {
        this.text = text;
    }

    get() {
        return this.text;
    }
}

export class ForeignKeyField extends Field {
    constructor(model, required = false, defaultVal = null) {
        super(required, defaultVal);
        this.model = model;
        this.key = null;
    }

    set(key) {
        this.key = parseInt(key);
    }

    get() {
        return this.key;
    }

    getModel() {
        return this.model;
    }

    getPK() {
        let temp = new this.model();
        return temp.getPK;
    }
}

export class OneToOneField extends Field {
    constructor(model, required = false, defaultVal = null) {
        super(required, defaultVal);
        this.model = model;
        this.key = null;
    }

    set(key) {
        this.key = parseInt(key);
    }

    get() {
        return this.key;
    }

    getModel() {
        return this.model;
    }

    getPK() {
        let temp = new this.model();
        return temp.getPK;
    }
}

export class ManyToManyField extends Field {
    constructor(model, required = false, defaultVal = null) {
        super(required, defaultVal);
        this.model = model;
        this.key = null;
    }

    set(key) {
        this.key = parseInt(key);
    }

    get() {
        return this.key;
    }

    getModel() {
        return this.model;
    }

    getPK() {
        let temp = new this.model();
        return temp.getPK;
    }
}
