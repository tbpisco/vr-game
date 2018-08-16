export class FontSizeManagerUtil {

	constructor(element) {

                this.element = element;

                window.addEventListener('resize', this.updateFontSize.bind(this));
                window.addEventListener('orientationchange', this.updateFontSize.bind(this));
                window.addEventListener('deviceorientation', this.updateFontSize.bind(this));
    
                this.updateFontSize();
        
        };
        
        updateFontSize(){
                this.element.style.fontSize = (window.innerWidth*0.01 + window.innerHeight*0.01) + "px";
        };

}
