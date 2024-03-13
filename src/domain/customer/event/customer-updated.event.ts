import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";
type dataChangeAddress = {
  id: string;
  name:string;
  address:Address
}
export default class CustomerUpdatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: dataChangeAddress;

    constructor(eventData: any) {
      this.dataTimeOccurred = new Date();
      this.eventData = eventData;
    }
}