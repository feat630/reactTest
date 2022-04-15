import { useState, useCallback, useEffect } from 'react';
import { Card } from './Card';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import { Link } from 'react-router-dom';

const style = {
    width: 400,
};
export const Container = () => {
    {
		const getValue = (e) => {
			const { name, value } = e.target;
			console.log(value);
			
		}
		
        const [cards, setCards] = useState([]);
		const [cards1, setCards1] = useState([])

		const fetchDatas = async() => {
			const reponse = await axios.get('http://localhost:4000/dnd');
			setCards(reponse.data);
			console.log('render');
		}

		const fetchDatas1 = async() => {
			const reponse = await axios.get('http://localhost:4000/dnd2');
			setCards1(reponse.data);
			console.log('render');
		}

		useEffect( ()=> {
			fetchDatas();
			fetchDatas1();
		},[]);

        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) => update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }));
        }, []);
        const renderCard = useCallback((card, index) => {
            return (<Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>);
        }, []);
        return (
			<>
				<Link to="/">DnD테스트</Link>
				<br/><br/>
				<input 
					className="text-input"
					type='text'
					placeholder='내용입력'
					onChange={getValue}
					name='text'
				/>
				<button>add</button>
				<br/><br/>
				<DndProvider backend={HTML5Backend}>
					<div style={style}>{cards?.map((card, i) => renderCard(card, i))}</div>
				</DndProvider>
				<hr/>
				<DndProvider backend={HTML5Backend}>
					<div style={style}>{cards1?.map((card1, i) => renderCard(card1, i))}</div>
				</DndProvider>
			</>
		);
    }
};
export default Container;