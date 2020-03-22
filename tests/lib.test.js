function absolute(number) {
  if (number > 0) return number;
  if (number < 0) return -number;
  return 0;
}

function greet(name) {
  return "Welcome " + name;
}

function getCurr() {
  return ["USD", "EUR", "RUB"];
}

function getProduct(productId) {
  return { id: productId, price: 10, category: "Web" };
}

function registerUser(username) {
  if (!username) throw new Error("Username is required");

  return { id: new Date().getTime(), username: username };
}

describe("registerUser", () => {
  it("should throw if username is falsy ", () => {
    // null, undfined, NAN, '' , 0 , false
    const args = [null, undefined, NaN, 0, "", false];
    args.forEach(a => {
      expect(() => {
        registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is  passed", () => {
    const result = registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("Get product", () => {
  it("should return product with a givern aid", () => {
    const result = getProduct(1);
    //expect(result).toBe({ id: 1, price: 10 }); // wont work diff memory location
    //expect(result).toEqual({ id: 1, price: 10 }); // won work if object changed
    expect(result).toMatchObject({ id: 1, price: 10 });

    expect(result).toHaveProperty("id", 1);
  });
});

describe("Get currency", () => {
  it("should return an array of suppoeted currencies", () => {
    const result = getCurr();
    // too general
    //expect(result).toBeDefined();
    //expect(result).not.toBeNull();

    // to specific
    // expect(result[0]).toBe("USD");
    // expect(result[1]).toBe("EUR");

    //expect(result.length).toBe(3);

    // proper way
    // expect(result).toContain("USD");
    // expect(result).toContain("EUR");

    //clean way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "RUB"]));
  });
});

describe("Greet function", () => {
  it("should return the greeting message", () => {
    const result = greet("Mosh");
    //expect(result).toMatch(/Mosh/);
    expect(result).toContain("Mosh");
  });
});

describe("Test absolute function", () => {
  test("Should return positibe number if inout is positive", () => {
    const result = absolute(1);
    expect(result).toBe(1);
  });

  test(" Should return positibe number if inout is negative", () => {
    const result = absolute(-1);
    expect(result).toBe(1);
  });

  test(" Should return 0 number if inout is 0", () => {
    const result = absolute(0);
    expect(result).toBe(0);
  });
});
