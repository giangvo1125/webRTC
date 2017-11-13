import React, {Component} from 'react'

export const _renderListItemBet = (array, tabLinkActive, onClickTitleFunction, onClickItemFunction) => {
	let list_item = [];
	if(array.length > 0) {
		list_item = array.map((item, index) => {
			let key = `key-${item.key}`
			let list_bet = [];
			if(item.isActive == true) {
				list_bet = item.listItem.map((i, n) => {
					let subKey = `${key}-${n}`
					if(tabLinkActive != 'tab_live') {
						if(i.isActive == true) {
							return (
								<li 
									key={subKey} 
									className="sub-li" 
									onClick={(e) => {
										if(typeof onClickItemFunction === 'function') {
											onClickItemFunction(i)
										}
									}}
								>
									<span className="number">{i.number}</span>
									<a>{i.label}</a>
								</li>
							)
						}
					}
					else {
						if(i.isActive == true && i.key == 'hdpOu') {
							return (
								<li 
									key={subKey} 
									className="sub-li" 
									onClick={(e) => {
										if(typeof onClickItemFunction === 'function') {
											onClickItemFunction(i)
										}
									}}
								>
									<span className="number">{i.number}</span>
									<a>{i.label}</a>
								</li>
							)
						}
					}
				})
			}
			return (
				<div key={key}>
					<li 
						onClick={(e) => {
							if(typeof onClickTitleFunction === 'function') {
								onClickTitleFunction(item);
							}
						}}
					>
						<i className={item.icon || ''}></i>
						<span className="number">{item.number}</span>
						<span className="live">
							{
								item.isShowLivePanel == true ? 
								<img src="/assets/images/icoLive.gif"/> : 
								''
							}
						</span>
						<a><span>{item.label || ''}</span></a>
					</li>
					{list_bet}
				</div>
			)
		})
	}
    return (
        <ul className="menu-sport">
			{list_item}
		</ul>
    )
}

export const _renderListDropDown = (keyList, list, value, onClickFunction) => {
	let list_render = []
	let findItemActive = _.find(list, (item) => {
		return item.value == value;
	})
	list_render = list.map((item, index) => {
		let key = `key-dropdown-${item.label}`
        return (
            <li 
            	className={`${Helper.checkObj(findItemActive) && findItemActive.value == item.value ? 'active' : ''}`} 
            	key={key} 
            	onClick={(e)=> {
            		if(typeof onClickFunction === 'function') {
            			onClickFunction(keyList, item.value);
            		}
            	}}
            >
            	{item.label}
            </li>
        )
	})
	return (
		<div className="dropdown" style={{marginRight: '3px'}}>
            <div className="btn-icon">
                <a className="btn">{findItemActive.label || ''}</a>
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="dropdown__content">
                <ul>
                    {list_render}
                </ul>
            </div>
        </div>
	)
}