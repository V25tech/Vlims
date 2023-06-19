import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  Validate(formgroup:FormGroup){
    formgroup.markAllAsTouched();    
    return formgroup.valid;
  }
  markFormUntouched(formgroup: FormGroup) {
    formgroup.markAsUntouched();
    return formgroup.valid;
  }
  ValidateSections(fgs:Array<FormGroup>){    
     let isValid = true;
    fgs.forEach(fg=>{
      isValid = isValid && fg.valid;
      if(!fg.valid){
        fg.markAllAsTouched();        
      }
    });
    return isValid;
  }
  public toDateObject(str: string): Date {
    return new Date(str);
  }
  IsCtrlInvalid(formcontrol:FormControl){
    return (formcontrol.invalid && formcontrol.touched);
  }
  GetErrorMessage(formcontrol:any, messages:any, dispalyName?: string){   
    let name: string = ' ' + (dispalyName == undefined ? formcontrol.name.toLocaleLowerCase() : dispalyName);
    if (formcontrol.errors.required) {
      return (messages['req-msg'] ? messages['req-msg'] : name +' is required');
    }
    else if (formcontrol.errors.pattern) {
      return (messages['pattern-msg'] ? messages['pattern-msg'] : 'Please provide valid' + name);
    }
	else if (formcontrol.errors.patternError) {
      return (messages['pattern-msg'] ? messages['pattern-msg'] : 'Please provide valid' + name);
    }
	  else if (formcontrol.errors.maxlength) {
      return 'Maxlength exceeded for' + name;
    }
    else if (formcontrol.errors.minlength) {
      return 'Minlength not matched for' + name;
    }
    else if (formcontrol.errors.maxError) {
      return 'Max value should be ' + formcontrol.errors.maxError.maxValue;
    }
    else if (formcontrol.errors.minError) {
      return 'Min value should be ' + formcontrol.errors.minError.minValue;
    }
    else if (formcontrol.errors.validYear) {
      return 'Please provide valid' + name;
    }
    else if (formcontrol.errors.datesmismatch) {
      return 'Please provide valid' + name;
    }
    else if (formcontrol.errors.email) {
      return 'Please provide valid' + name;
    }
  }
}

