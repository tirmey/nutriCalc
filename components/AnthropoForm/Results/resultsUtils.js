export const imc = st =>  (st.weight / Math.pow(st.height / 100, 2)).toFixed(0);
export const vet = st =>  (st.aim * st.weight).toFixed(0);
export const hb = st => (st.gender === 'feminino' ? 447.593 + (9.247 * st.weight) + (3.098 * st.height) - (4.33 * st.age) : 88.362 + (13.397 * st.weight) + (4.799 * st.height) - (5.677 * st.age)).toFixed(0);


