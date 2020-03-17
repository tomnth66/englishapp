import React, { Component } from 'react';
import '../css/InsideNews.css';
import firebase from '../firebase.js';
import Ava from '../img/stitch.jpg';
import 'font-awesome/css/font-awesome.min.css';
import { Button, Card, Tab, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Loading from './Loading.js';

let words;
let fullPara;
let read_more_Para;
let curID;
let maxParaLength = 150; // 200 words is max => read more button

export default class Newsmain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowSetting: false,
			EditState: false,
			originValue: '',
			value: '',
			content: '',
			read_more_content: '',
			isLoading: false,
			read_more: false,
			read_more_on: false,
			isReadMore: false
		};

		this.inputElement1 = React.createRef();
		this.inputElement2 = React.createRef();
	}

	componentDidMount() {
		this.setState(
			{
				isShowSetting: false,
				EditState: false,
				originValue: this.props.Announcement.AnnouncementContent,
				value: this.props.Announcement.AnnouncementContent,
				isLoading: false
			},
			() => this.updateRenderDB()
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.Announcement !== this.props.Announcement) {
			this.setState(
				{
					isShowSetting: false,
					EditState: false,
					originValue: this.props.Announcement.AnnouncementContent,
					value: this.props.Announcement.AnnouncementContent,
					isLoading: false
				},
				() => this.updateRenderDB()
			);
		}
	}

	updateRenderDB() {
		let curAnn = this.props.Announcement.AnnouncementContent;
		words = curAnn.split('\n');
		fullPara = '';
		read_more_Para = '';
		curID = 0;

		fullPara += `#${this.props.Announcement.id}\n`;
		read_more_Para += `#${this.props.Announcement.id}\n`;
		for (let word of words) {
			fullPara += `<div>\n`;
			if (curID <= maxParaLength) read_more_Para += `<div> \n`;
			word = word.split(' ');
			for (let i = 0; i < word.length; ++i) {
				++curID;
				if (word[i] !== '') {
					fullPara += `<span>${word[i]} </span>`;
					if (curID <= maxParaLength)
						read_more_Para += `<span>${word[i]} </span>`;
				} else {
					fullPara += '<div style="height: 1rem"></div>';
					if (curID <= maxParaLength) {
					}
					read_more_Para += '<div style="height: 1rem"></div>';
				}
			}
			fullPara += `</div>\n`;
			if (curID <= maxParaLength) read_more_Para += `</div>\n`;
		}

		if (curID > maxParaLength) {
			console.log(fullPara);
			this.setState({
				content: fullPara,
				read_more: true,
				isReadMore: true,
				read_more_on: true,
				read_more_content: read_more_Para
			});
		} else {
			console.log('full ', fullPara);
			this.setState({
				isReadMore: false,
				read_more: false,
				read_more_on: false,
				content: fullPara
			});
		}
	}

	showSetting() {
		this.setState(
			{
				isShowSetting: !this.state.isShowSetting
			},
			() => {
				document.addEventListener(
					'mousedown',
					this.handleClick.bind(this),
					false
				);
			}
		);
	}

	handleClick(event) {
		if (this.state.isShowSetting) {
			if (
				!this.inputElement1.current.contains(event.target) &&
				!this.inputElement2.current.contains(event.target)
			) {
				this.setState({
					isShowSetting: false
				});
			}
		}
	}

	saveEdit() {
		this.setState({
			isLoading: true
		});
		const db = firebase.firestore();
		const ref = db.collection('Announcement').doc('A4TT0kGAgjKUxs2wrj8p');
		let curAnn = this.props.Announcement.AnnouncementContent;
		words = curAnn.split('\n');
		fullPara = '';
		read_more_Para = '';
		curID = 0;

		fullPara += `#${this.props.Announcement.id}\n`;
		read_more_Para += `#${this.props.Announcement.id}\n`;
		for (let word of words) {
			fullPara += `<div>\n`;
			if (curID <= maxParaLength) read_more_Para += `<div> \n`;
			word = word.split(' ');
			for (let i = 0; i < word.length; ++i) {
				++curID;
				if (word[i] !== '') {
					fullPara += `<span>${word[i]} </span>`;
					if (curID <= maxParaLength)
						read_more_Para += `<span>${word[i]} </span>`;
				} else {
					fullPara += '<div style="height: 1rem"></div>';
					if (curID <= maxParaLength) {
					}
					read_more_Para += '<div style="height: 1rem"></div>';
				}
			}
			fullPara += `</div>\n`;
			if (curID <= maxParaLength) read_more_Para += `</div>\n`;
		}

		ref.get().then(data => {
			let AnnouncementList = data.data().AnnouncementList;
			let idx = AnnouncementList.findIndex(
				Ann => Ann.id === this.props.Announcement.id
			);

			AnnouncementList[idx].AnnouncementContent = curAnn;

			ref.set({ AnnouncementList: AnnouncementList }).then(() => {
				if (curID > maxParaLength) {
					this.setState({
						EditState: false,
						isLoading: false,
						originValue: this.state.value,
						content: fullPara,
						read_more: true,
						isReadMore: true,
						read_more_on: true,
						read_more_content: read_more_Para
					});
				} else {
					this.setState({
						isReadMore: false,
						read_more: false,
						read_more_on: false,
						EditState: false,
						isLoading: false,
						originValue: this.state.value,
						content: fullPara
					});
				}
			});
		});
	}

	handleTextChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	EditNews() {
		this.setState(
			{
				isShowSetting: false,
				EditState: true
			},
			() => {
				const Ref = this.EditTextRef;
				const length = this.EditTextRef.value.length;
				Ref.focus();
				Ref.setSelectionRange(length, length);
			}
		);
	}

	DeleteNews() {
		this.setState({
			isLoading: true
		});

		const db = firebase.firestore();
		const ref = db.collection('Announcement').doc('A4TT0kGAgjKUxs2wrj8p');

		ref.get().then(data => {
			let AnnouncementList = data.data().AnnouncementList;
			let idx = AnnouncementList.findIndex(
				Ann => Ann.id === this.props.Announcement.id
			);

			AnnouncementList.splice(idx, 1);

			ref.set({ AnnouncementList: AnnouncementList }).then(() => {
				this.setState(
					{
						isShowSetting: false,
						isLoading: false
					},
					() => this.props.GetDB()
				);
			});
		});
	}

	closeEdit() {
		this.setState({
			EditState: false,
			value: this.state.originValue
		});
	}

	readMore = () => {
		this.setState({
			read_more_on: !this.state.read_more_on,
			read_more: !this.state.read_more
		});
	};

	render() {
		return (
			<div className="Newsmain">
				{this.state.isLoading && <Loading />}
				<div className="Auther">
					<div className="AutherAvatar">
						<img className="Picture" src={Ava}></img>
					</div>
					<div className="AutherName">
						<span>San</span>
					</div>

					{localStorage.getItem('class') === 'admin' && (
						<div className="News-icons">
							<IconButton
								ref={this.inputElement1}
								onClick={this.showSetting.bind(this)}
							>
								<MoreHorizIcon id="curIcon" />
							</IconButton>
						</div>
					)}

					{this.state.isShowSetting && (
						<Card ref={this.inputElement2} className="News-setting">
							<Tab
								onClick={this.EditNews.bind(this)}
								label="Edit"
								style={{ minWidth: '7rem' }}
							/>
							<Tab
								onClick={this.DeleteNews.bind(this)}
								label="Delete"
								style={{ minWidth: '7rem' }}
							/>
						</Card>
					)}
				</div>

				<div className="NewsContent">
					{!this.state.EditState && (
						<div>
							{!this.state.read_more_on ? (
								<div
									onClick={() => {
										if (this.state.isReadMore) this.readMore();
									}}
									dangerouslySetInnerHTML={{ __html: this.state.content }}
								></div>
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: this.state.read_more_content
									}}
								></div>
							)}
							{this.state.read_more && (
								<span className="read--more" onClick={this.readMore}>
									... Read More
								</span>
							)}
						</div>
					)}

					{this.state.EditState && (
						<div>
							<textarea
								ref={ref => (this.EditTextRef = ref)}
								value={this.state.value}
								onChange={this.handleTextChange.bind(this)}
								id="EditTextArea"
							></textarea>
							<div className="EditNewsBtn">
								<Button
									color="primary"
									variant="contained"
									onClick={this.closeEdit.bind(this)}
								>
									Cancel
								</Button>

								<Button
									color="primary"
									variant="contained"
									onClick={this.saveEdit.bind(this)}
								>
									Save
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
