async function getCustomerSync(id) {
  return new Promise((resolve, reject) => {
    console.log("reading from mongoDB");
    resolve({ id: id, points: 11 });
  });
}

function applyDiscout(order) {
  const customer = getCustomerSync(order.customerId);

  if (customer.points > 10) order.totalPrice *= 0.9;
}

describe("Test mock function call DB", () => {
  it("should apply 10% discount if customer is more than 10 points", () => {
    // mock function
    getCustomerSync = function(customerId) {
      console.log("fake reading customer");
      return {
        id: customerId,
        points: 20
      };
    };
    const order = { customerId: 1, totalPrice: 10 };
    applyDiscout(order);
    expect(order.totalPrice).toBe(9);
  });

  xit("JEst mock functions", () => {
    // mock function
    const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error('message'));
    // const result = await mockFunction();

    applyDiscout = jest.fn().mockReturnValue({
      id: 1,
      points: 20
    });
    const order = { customerId: 1, totalPrice: 10 };
    applyDiscout(order);
    expect(applyDiscout).toHaveBeenCalledWith(1, 10);
    expect(applyDiscout.mock.calls[0][0]).toBe(1);
    expect(order.totalPrice).toBe(9);
  });
});
