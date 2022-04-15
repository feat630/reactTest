import axios from "axios";

export const data = [
	{
	  id: "5f832341cc119a50d1adb972",
	  name: {
		first: "Goff",
		last: "Robbins",
	  },
	},
	{
	  id: "5f832341e1d0f20fc283177a",
	  name: {
		first: "Pickett",
		last: "Burks",
	  },
	},
	{
	  id: "5f832341daae2cc0af8610a4",
	  name: {
		first: "Taylor",
		last: "Campos",
	  },
	},
	{
	  id: "5f832341ef54dda7b80930da",
	  name: {
		first: "Nolan",
		last: "Bright",
	  },
	},
	{
	  id: "5f8323410a6b9155385bd47d",
	  name: {
		first: "Fran",
		last: "Buchanan",
	  },
	},
	{
	  id: "5f8323416ecbb23bb925363a",
	  name: {
		first: "Vonda",
		last: "Nieves",
	  },
	},
	{
	  id: "5f832341eee9783dfccbfa6d",
	  name: {
		first: "Sheree",
		last: "Reynolds",
	  },
	},
	{
	  id: "5f832341c0b0131eeade1b00",
	  name: {
		first: "Lilian",
		last: "Russell",
	  },
	},
  ];
export const data1 = () => {
	const fetchDatas = async() => {
		const reponse = await axios.get('http://localhost:4000/dnd');
		
	};
}