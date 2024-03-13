import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLog1Handler from "./handler/sendConsoleLog1.handler";
import SendConsoleLog2Handler from "./handler/sendConsoleLog2.handler";
import CustomerCreatedEvent from "./customer-created.event";
describe("Customer created event unit tests", () => {
    it("should register a customer created event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    })

    it("Should unregister a customer created event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    })

    it("Should unregister all customer created event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    })

    it("should notify all customer created event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');


        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "John",
            address:{
                street: "Street",
                number: 123,
                city: "City",
                state: "State",
                zip: "Zip",
                country: "Country"
            }
        })

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })
})
