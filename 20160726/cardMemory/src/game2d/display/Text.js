/**
 * Created by 87676 on 7/26/2016.
 */
import Display from "game2d/display/Display";
class Text extends Display{
    constructor(text,fontSize,fontColor,fontFamily){
        super();
        this._text=text;
        this._fontSize=fontSize||10;
        this._fontColor=fontColor||"#000";
        this._fontFamily=fontFamily;
        this.generateFontString();
    }
    generateFontString(){
        this._font=`${this._fontSize}px ${this._fontFamily}`;
    }
    setText(value){
        this._text=value;
    }
    getText(){
        return this._text;
    }
    setFontColor(value){
        this._fontColor=value;
    }
    getFontColor(){
        return this._fontColor;
    }
    setFontFamily(value){
        this._fontFamily=value;
    }
    getFontFamily(){
        return this._fontFamily;
    }
    setFontSize(value) {
        this._fontSize = value;
    }
    getFontSize(){
        return this._fontSize;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} context2d
     */
    onDraw(context2d) {
        context2d.fillStyle=this._fontColor;
        context2d.font=this._font;
        context2d.fillText(this._text,0,this._fontSize);
    }
}
export  default Text;