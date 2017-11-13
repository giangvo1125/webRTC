import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/partials/header';
import MainMenuComponent from '../components/partials/main_menu';
import { bindActionCreators } from 'redux';

import HelperAction from '../actions/helper_action'
import UserAction from '../actions/user_action'
import OddAction from '../actions/odd_action'

import FavoritePanel from '../components/main/detail/panel/favorite_panel'
import FundTransferPanel from '../components/main/detail/panel/fund_transfer_panel'
import SportMenuPanel from '../components/main/detail/panel/sport_menu_panel'
import StatusBetPanel from '../components/main/detail/panel/status_bet_panel'
import BetPanel from '../components/main/detail/panel/bet_panel'

import MenuFilter from '../components/main/detail/menu_filter'

export default function (ComposedComponent) {
    class Authentication extends Component {
        constructor(props, context) {
            super(props);
            context.router
        }

        componentDidMount() {
            $(".panel > .panel__header").click(function(){
                $(this).parent().toggleClass("active");
            });
            setTimeout(()=>{
               let siteWidth = 1024
               let scale = screen.width /siteWidth
               document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
            }, 0)
        }

        componentWillMount() {
            if(!Helper.checkData(Cookies.get('token'))) {
                this.context.router.push('/login')
            }
            else {
                // this.props.getBetList();
                this.props.refreshInfo();
            }
        }

        componentDidUpdate() {
            if(!Helper.checkData(Cookies.get('token'))) {
                this.context.router.push('/login')
            }
            else {
                // this.props.refreshInfo();
                // this.props.getBetList();
            }
        }

        _onChangeRoute(name) {
            this.context.router.push(name);
        }
        _onChangeTheme(e) {
            let { listTheme } = this.props;
            let value = e.target.value;
            $(`link[title=${e.target.value}]`).removeAttr("disabled");
            this.props.changeTheme(e.target.value)
            setTimeout(()=> {
                listTheme.forEach((item) => {
                    if(item != value) {
                        $(`link[title=${item}]`).attr('disabled', 'disabled');
                    }
                })
            },200)
        }

        render() {
            let {
                isShowBetPanel, 
                route: {
                    path, 
                }, 
                mainMenu, 
                listTheme, 
                codeTheme, 
            } = this.props;
            if(path != 'welcome') {
                let { mainMenu } = this.props || {}

                if(!Helper.checkObj(mainMenu)) mainMenu = {}

                let optionsListTheme = listTheme.map((item) => {
                    let key = `theme-${item}`;
                    return (
                        <option key={key} value={item}>{item}</option>
                    )
                })

                return (
                    <div className="background-primary">
                        <nav className="section-main-menu primary">
                            <div className="container">
                                <div className="main-menu">
                                    <ul>
                                        <li onClick={this._onChangeRoute.bind(this, '/bet-list')}>
                                            <a>{mainMenu.betListMenu || 'Bet List'}</a>
                                        </li>
                                        <li onClick={this._onChangeRoute.bind(this, 'statement')}>
                                            <a>{mainMenu.statementMenu || 'Statement'}</a>
                                        </li>
                                        <li onClick={this._onChangeRoute.bind(this, 'account')}>
                                            <a>{mainMenu.myAccountMenu || 'My Account'}</a>
                                        </li>
                                        <li onClick={this._onChangeRoute.bind(this, 'result')}>
                                            <a>{mainMenu.resultMenu || 'Result'}</a>
                                        </li>
                                    </ul>
                                    <select 
                                        className="form-control" 
                                        style={{
                                            maxWidth: '100px', 
                                            marginLeft: 'auto', 
                                            marginTop: 'auto', 
                                            marginBottom: 'auto', 
                                        }}
                                        value={codeTheme || ''}
                                        onChange={this._onChangeTheme.bind(this)}
                                    >
                                        {optionsListTheme}
                                    </select>
                                </div>
                            </div>
                        </nav>
                        <HeaderComponent/>
                        <MainMenuComponent/>
                        
                        <main className="main aside-close">
                            <div className="container">
                                <div className="layout">
                                    <aside className="aside">
                                        <FavoritePanel/>
                                        {
                                            isShowBetPanel != true ?
                                            <div>
                                                <FundTransferPanel/>
                                                <SportMenuPanel/>
                                                <StatusBetPanel/>
                                            </div> : 
                                            <BetPanel/>
                                        }
                                    </aside>
                                    <article className="article">
                                        {    
                                            path === undefined ? 
                                            <MenuFilter /> : ''
                                        }
                                        <ComposedComponent {...this.props} />
                                    </article>
                                </div>
                            </div>
                        </main>
                        <footer className="footer footer-background">
                            <div className="container">
                                
                            </div>
                        </footer>

                    </div>
                );
            }
            else {
                return <ComposedComponent {...this.props} />
            }
        }
    }

    Authentication.contextTypes = {
        router: PropTypes.object,
        authenticated: PropTypes.bool
    };

    function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...HelperAction, 
        ...UserAction, 
        ...OddAction, 
    }, dispatch)
}

function mapStateToProps(state) {
    return {
        user: state.auth.user, 
        isShowBetPanel: state.helper.isShowBetPanel, 
        mainMenu: state.helper.language.mainMenu, 
        codeTheme: state.helper.codeTheme, 
        listTheme: state.helper.listTheme, 
    }
}

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}

