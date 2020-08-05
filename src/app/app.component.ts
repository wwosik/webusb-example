import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  displayedColumns = ['productName', 'deviceClass', 'productId', 'vendorId'];
  devices: USBDevice[] = [];
  isLoading = false;

  lastDeviceAsJson: string;

  constructor() {
    navigator.usb
      .getDevices()
      .then((result) => (this.devices = result))
      .catch(console.error);
  }

  async getDevice(): Promise<void> {
    this.isLoading = true;
    const device = await navigator.usb.requestDevice({
      filters: [{}],
    });

    console.log('Last device', device);
    this.devices = await navigator.usb.getDevices();
    console.log(this.devices);
    this.isLoading = false;
  }
}
