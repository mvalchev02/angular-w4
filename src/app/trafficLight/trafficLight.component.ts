import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-trafficLight',
  templateUrl: './trafficLight.component.html',
  styleUrls: ['./trafficLight.component.css']
})
export class TrafficLightComponent implements OnInit {
  @Input()
    id!: number;
  redLight: boolean = true;
  yellowLight: boolean = false;
  greenLight: boolean = false;
  isCrossingDisabled: boolean = true;
  intervalId: any;

  cycleDurations = [5000, 2000, 5000]; // durations in ms for red, yellow, and green
color: any;

  constructor() {}

  ngOnInit() {
    this.startCycle();
  }

  startCycle() {
    let index = 0;
    this.intervalId = setInterval(() => {
      this.redLight = index === 0;
      this.yellowLight = index === 1;
      this.greenLight = index === 2;
      this.isCrossingDisabled = this.redLight;
      index = (index + 1) % 3;
    }, this.cycleDurations[index]);
  }

  onCross() {
    if (this.yellowLight) {
      alert('Неправилно пресичане');
    }
  }

  setEmergency(isEmergency: boolean) {
    if (isEmergency) {
      clearInterval(this.intervalId);
      this.redLight = false;
      this.yellowLight = true;
      this.greenLight = false;
    } else {
      this.startCycle();
    }
  }
}
