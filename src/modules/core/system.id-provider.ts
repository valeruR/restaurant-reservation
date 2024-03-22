import { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { nanoid } from "@reduxjs/toolkit";

export class SystemIdProvider implements IIDProvider {
  generate() {
    return nanoid();
  }
}