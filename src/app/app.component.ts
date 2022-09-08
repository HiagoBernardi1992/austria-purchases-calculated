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
    

  }

  valueChange(valueType: ValueType) {
    if(this.form.value.rateVAT)
        {
          switch(valueType) {
            case ValueType.NetPrice:
              this.form.controls["amountsVAT"].setValue(
                Number(this.form.value.netPrice) * (this.form.value.rateVAT / 100)
              );
              this.form.controls["grossPrice"].setValue(
                Number(this.form.value.netPrice) + this.form.value.amountsVAT
              );              
              break;
            case ValueType.GrossPrice:
              this.form.controls["amountsVAT"].setValue(
                (Number(this.form.value.grossPrice) * Number(this.form.value.rateVAT)) / (100 + Number(this.form.value.rateVAT))
              );
              this.form.controls["netPrice"].setValue(
                Number(this.form.value.grossPrice) - this.form.value.amountsVAT
              );
              break;
            case ValueType.amountsVAT:
              break;
            default:
              break;
          }
        }
  }

}
