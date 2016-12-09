/**
 * Created by prabod on 12/7/16.
 */

class Field{
    constructor(required=true, defaultVal=null, pk=false, ai=false){
        this.required = required;
        this.defaultVal = defaultVal;
        this.pk = pk;
        this.ai = ai;

    }
}
export class CharField extends Field{
    constructor( maxLength,required=true, defaultVal=null, pk=false){
        super(required, defaultVal, pk);
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
    constructor( maxLength = null,required=true, defaultVal=null, pk=false, ai=false){
        super(required, defaultVal, pk,ai);
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
    constructor( maxLength,required=true, defaultVal=null, pk=false){
        super(required, defaultVal, pk);
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
        super(required, defaultVal);
        this.boolean = null;
    }
    set(boolean){
        this.boolean = boolean;
    }
    get(){
        return this.boolean;
    }
}

export class DateField extends Field{
    constructor(required=true, defaultVal=null){
        super(required, defaultVal);
        this.date = null;
    }
    set(date){
        this.date = date;
    }
    get(){
        return this.date;
    }
}