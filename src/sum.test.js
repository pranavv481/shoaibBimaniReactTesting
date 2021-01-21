import sum from "./sum";

it("when a & b is number", ()=>{
    const result = sum(1,2);
    expect(result).toBe(3)
})

it(" when a& bis string", ()=>{
    const result = sum("1","2");
    expect(result).toBe(3)
})