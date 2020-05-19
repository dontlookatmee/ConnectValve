import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-service-card",
  templateUrl: "./service-card.component.html",
  styleUrls: ["./service-card.component.css"],
})
export class ServiceCardComponent implements OnInit {
  @Input("title") title: string = "bind title text";
  @Input("description") description: string = "bind description text";
  @Input("buttonText") buttonText: string = "bind button text";
  @Input("imageUrl") imageUrl: string;
  @Input("buttonType") buttonType: string = "primary";

  constructor() {}

  ngOnInit(): void {}
}
