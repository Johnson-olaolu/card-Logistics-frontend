import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const StyledCustomDropDown = styled.div`
	position: relative;
	.section-1 {
		height: 48px;
		border: 1px solid rgba(151, 151, 151, 0.261662);
		box-sizing: border-box;
		border-radius: 2px;
		background: transparent;
		padding: 0 16px;
		color: #cacaca;
		display: flex;
		font-size: 14px;
		align-items: center;
		justify-content: space-between;
		cursor : pointer;
		${props => props.active && css`
			border: 1px solid #257CFF;
			color :#257CFF;
			svg {
				transform : rotate(180deg);
			}
		`}

		${props => props.selected && css`
			span {
				color :black;
			}
		`}

	}
	.section-2 {
		position: absolute;
		width: 100%;
		background-color: white;
		padding: 0px;
		border-bottom-left: 2px;
		border-bottom-right: 2px;
		z-index: 5;
		top: 97%;
		left: 0;
		border: 1px solid #257CFF;
		max-height : 200px;
		overflow : auto;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
			0 1px 2px -1px rgb(0 0 0 / 0.1);
		ul {
			span {
				font-size: 14px;
				display : inline-block;
				padding: 8px 16px;
				color: #257CFF;
				cursor: default;
			}
			li {
				font-size: 14px;
				padding: 8px 16px;
				color: #cacaca;
				cursor : ponter;
				&:hover {
					color: white;
					background: #257CFF;
				}
			}
		}
	}
`;

const CustomDropDown = (props) => {
	const { data , onSelect, name , value , placeholder} = props
	const [showDropdown, setShowDropdown] = useState(false);
	const [showValue, setShowValue] = useState(value)
	const [selected, setSelected] = useState({
		name : "",
		value : ""
	})

	const onChange = (selectedItem) => {
		setSelected(selectedItem)
		setShowDropdown(false)
		onSelect(name, selectedItem.value)
	}

	

	const onClickPlaceholder = () => {
		onSelect(name, "")
		setShowDropdown(false)
	}

	return (
		<StyledCustomDropDown active = { showDropdown } selected = {!value === false}>
			<div onClick={ () => {setShowDropdown(!showDropdown)}} className="section-1">
				<span>{ value || placeholder}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
			{showDropdown && (
				<>
					<div className="section-2">
						<ul className="">
							<span onClick={ onClickPlaceholder} className="">{placeholder}</span>
							{data?.map((datapoint, index) => (
								<li key={index} onClick={ () => {onChange(datapoint)}} className=""> {datapoint.name}</li>
							))}
						</ul>
					</div>
				</>
			)}
		</StyledCustomDropDown>
	);
};

export default CustomDropDown;
