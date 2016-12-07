/**
 * Created by prabod on 12/7/16.
 */

class Field{
    constructor(required=true, defaultVal=null){
        this.required = required;
        this.defaultVal = defaultVal;
    }
}

export class CharField extends Field{
    constructor( maxLength,required=true, defaultVal=null){
        super(required=true, defaultVal=null);
        this.maxLength = maxLength;
        this.char = null;
    }
    set(char){
        this.char = char;
    }
    get(){
        return this.char;
    }
}


export class IntegerField extends Field{
    constructor( maxLength,required=true, defaultVal=null){
        super(required=true, defaultVal=null);
        this.maxLength = maxLength;
        this.int = null;
    }
    set(int){
        this.int = parseInt(int);
    }
    get(){
        return this.int;
    }
}

export class FloatField extends Field{
    constructor( maxLength,required=true, defaultVal=null){
        super(required=true, defaultVal=null);
        this.maxLength = maxLength;
        this.float = null;
    }
    set(float){
        this.float = parseFloat(float);
    }
    get(){
        return this.float;
    }
}

export class BooleanField extends Field{
    constructor(required=true, defaultVal=null){
        super(required=true, defaultVal=null);
        this.boolean = null;
    }
    set(boolean){
        this.boolean = parseFloat(boolean);
    }
    get(){
        return this.boolean;
    }
}