const Swal = {
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
};
export default Swal;