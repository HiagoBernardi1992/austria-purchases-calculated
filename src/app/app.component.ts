import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ValueType } from 'src/enums/value-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: string[] = ['10', '13', '20'];
  form: FormGroup;
  lastChanged: ValueType;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rateVAT: [null],
      netPrice: [null],
      grossPrice: [null],
      amountsVAT: [null]
    })
  }

  rateChange(e: MatSelectChange) {
    if(this.form.value.netPrice || this.form.value.grossPrice || this.form.value.amountsVAT)  
    {
      if(this.form.value.netPrice && this.lastChanged == ValueType.NetPrice)
      {
        this.valueChange(ValueType.NetPrice);
        return;
      }
      if(this.form.value.grossPrice && this.lastChanged == ValueType.GrossPrice)
      {
        this.valueChange(ValueType.GrossPrice);
        return;
      }
      if(this.form.value.amountsVAT && this.lastChanged == ValueType.amountsVAT)
      {
        this.valueChange(ValueType.amountsVAT);
        return;
      }
    } 

  }

  valueChange(valueType: ValueType) {
    this.lastChanged = valueType;
    if(this.form.value.rateVAT)
        {
          switch(valueType) {
            case ValueType.NetPrice:
              this.form.controls["amountsVAT"].setValue(
                (Number(this.form.value.netPrice) * (this.form.value.rateVAT / 100)).toFixed(2)
              );
              this.form.controls["grossPrice"].setValue(
                (Number(this.form.value.netPrice) + Number(this.form.value.amountsVAT)).toFixed(2)
              );              
              break;
            case ValueType.GrossPrice:
              this.form.controls["amountsVAT"].setValue(
                ((Number(this.form.value.grossPrice) * Number(this.form.value.rateVAT)) / (100 + Number(this.form.value.rateVAT))).toFixed(2)
              );
              this.form.controls["netPrice"].setValue(
                (Number(this.form.value.grossPrice) - Number(this.form.value.amountsVAT)).toFixed(2)
              );
              break;
            case ValueType.amountsVAT:
              this.form.controls["netPrice"].setValue(
                ((Number(this.form.value.amountsVAT) * 100) / Number(this.form.value.rateVAT)).toFixed(2)
              );
              this.form.controls["grossPrice"].setValue(
                (Number(this.form.value.netPrice) + Number(this.form.value.amountsVAT)).toFixed(2)
              ); 
              break;
            default:
              break;
          }
        }
  }

}
