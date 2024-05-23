import { Component,ViewChildren, QueryList } from '@angular/core';
import { TrafficLightComponent } from './trafficLight/trafficLight.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChildren(TrafficLightComponent) trafficLights!: QueryList<TrafficLightComponent>;
  isEmergency: boolean = false;
  emergencyTimeoutId: any;

  ngAfterViewInit() {
    // Logic that relies on trafficLights should go here
  }

  triggerEmergency() {
    if (this.isEmergency) {
      return;
    }

    this.isEmergency = true;
    this.trafficLights.forEach(light => {
      light.setEmergency(true);
    });

    this.emergencyTimeoutId = setTimeout(() => {
      this.isEmergency = false;
      this.trafficLights.forEach(light => {
        light.setEmergency(false);
      });
    }, 10000);
  }
}

