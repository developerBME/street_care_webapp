import React, { useState } from 'react';
import defaultImage from '../../images/default_avatar.svg';
import verifiedImg from '../../images/verified_purple.png';
import CustomButton from '../Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal';
import userSlots from '../../images/userSlots.png';
import date from '../../images/date.png';
import locate from '../../images/location.png';
import { formatDate } from '../helper';
import CardTags from './CardTags';

const OutreachEventCard = ({
	cardData,
	isProfilePage,
	refresh,
	isPastEvent,
	openModal,
}) => {
	const {
		id,
		label,
		userName,
		title,
		eventDate,
		location,
		totalSlots,
		nop,
		photoUrl,
		description,
		skills
	} = cardData;
	const navigate = useNavigate();
	const [label2, setLabel2] = useState(label);
	console.log(label2);

	const [showModal, setShowModal] = useState(false);

	const handleEditClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const detailOutreach = () =>{
		navigate(`/outreachsignup/${id}`, {
			state: { label: 'EDIT' },
		});
	};
	

	return (
		<div
			className="bg-[#F5EEFE] min-w-full max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6 cursor-pointer"
			onClick={openModal}
		>
			{!isProfilePage && !isPastEvent ? (
				<div className="inline-flex items-center space-x-2 ">
					<img
						alt=""
						src={photoUrl || defaultImage}
						className="w-8 h-8 rounded-full"
					/>
					<div className="font-normal font-inter text-[13px] ">
						{userName}
					</div>
					<img alt="" src={verifiedImg} className="w-5 h-5" />
				</div>
			) : (
				<div className="mt-3"></div>
			)}

			{isProfilePage ? (
				<div className="my-3 space-y-3 w-full h-full flex flex-col" onClick={detailOutreach}>
					<div className="flex flex-col justify-between space-y-3">
						<div className="flex flex-row justify-normal space-x-2">
							<img
								alt=""
								className="w-[13px] h-[15px] my-[3px]"
								src={date}
							/>
							<div className="font-medium font-dmsans text-[14px] text-[#37168B]">
								{formatDate(eventDate)}
							</div>
						</div>
						<div className="flex flex-row justify-normal space-x-2">
							<img
								alt=""
								className="w-[12px] h-[15px] my-[3px]"
								src={locate}
							/>
							<div className="font-medium font-dmsans text-[14px] text-[#37168B]">
								{location.city}, {location.state}
							</div>
						</div>
					</div>

					<h1 className="font-medium font-dmsans text-[24px] line-clamp-1">
						{title}
					</h1>

					<div className="font-medium text-[14px] font-dmsans text-[#444746] line-clamp-2 h-10">
						{description}
					</div>

					<CardTags tags={skills} />
				</div>
			) : (
				<div className="my-3 space-y-3 w-full h-full flex flex-col" onClick={detailOutreach}>
					{isPastEvent ? (
						<div className="flex flex-row justify-between">
							<div className="flex flex-row justify-normal space-x-2">
								<img
									alt=""
									className="w-[13px] h-[15px] my-[2px]"
									src={date}
								/>
								<div className="font-medium font-dmsans text-[12px] text-[#37168B]">
									{formatDate(eventDate)}
								</div>
							</div>
							<div className="flex flex-row justify-normal space-x-2">
								<img
									alt=""
									className="w-[12px] h-[15px] my-[2px]"
									src={locate}
								/>
								<div className="font-medium font-dmsans text-[12px] text-[#37168B]">
									{location.city},{' '}
									{location.stateAbbv || location.state}
								</div>
							</div>
						</div>
					) : (
						<div className="flex flex-row justify-between" onClick={detailOutreach}>
							<div className="flex flex-row justify-normal space-x-2">
								<img
									alt=""
									className="w-[13px] h-[15px] my-[3px]"
									src={date}
								/>
								<div className="font-medium font-dmsans text-[14px] text-[#37168B]">
									{formatDate(eventDate)}
								</div>
							</div>
							<div className="flex flex-row justify-normal space-x-2">
								<img
									alt=""
									className="w-[12px] h-[15px] my-[3px]"
									src={locate}
								/>
								<div className="font-medium font-dmsans text-[14px] text-[#37168B]">
									{location.city},{' '}
									{location.stateAbbv || location.state}
								</div>
							</div>
						</div>
					)}
					<h1 className="font-medium font-dmsans text-[24px] line-clamp-1">
						{title}
					</h1>

					<div className="font-medium text-[14px] font-dmsans text-[#444746] line-clamp-2 h-10">
						{description}
					</div>

					<CardTags tags={skills} />
				</div>
			)}
			{!isPastEvent ? (
				<div className=" flex flex-col justify-end">
					<div className="flex items-center justify-between gap-16 my-1">
						{isProfilePage || label2 === 'EDIT' ? (
							<div className="group relative">
								{/* <CustomButton
									label="View"
									name="buttonlight"
									onClick={() => {
										navigate(`/outreachsignup/${id}`, {
											state: { label: 'EDIT' },
										});
									}}
								></CustomButton> */}

								{/* <CustomButton
                  label="Edit"
                  name="buttonlight"
                  onClick={handleEditClick}
                ></CustomButton>

                {showModal && (
                  <EditModal
                    handleClose={handleModalClose}
                    id={id}
                    label={label}
                    navigate={navigate}
                    label2={label2}
                    setLabel2={setLabel2}
                    refresh={refresh}
                    title={title}
                    eventDate={eventDate}
                    location={location}
                  />
                )} */}
							</div>
						) : (
							<div className="flex flex-row">
								{/* <div className="group relative mr-2">
                  <CustomButton
                    label={label2}
                    name="buttonlight"
                    onClick={() => {
                      navigate(`/outreachsignup/${id}`);
                    }}
                  />
                </div> */}
							</div>
						)}

						{/* This code is for adding number of volunteer ppl value to show up. */}
						{/* {!isProfilePage ? (
              <div className="flex flex-row space-x-2">
                <img
                  alt=""
                  className="w-[20px] h-[14px] my-1"
                  src={userSlots}
                ></img>
                <div className="font-normal font-dmsans text-[14px]">
                  {nop}/{totalSlots}
                </div>
              </div>
            ) : (
              <div></div>
            )} */}
					</div>
				</div>
			) : (
				<div className="mt-5 "></div>
			)}
		</div>
	);
};

export default OutreachEventCard;
