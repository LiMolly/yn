import type { Plugin } from '@fe/context'

export default {
  name: 'status-bar-help',
  register: ctx => {
    const showHelpAction = ctx.action.registerAction({
      name: 'plugin.status-bar-help.show-readme',
      keys: null,
      handler: () => ctx.doc.showHelp(
        ctx.i18n.getCurrentLanguage() === 'zh-CN'
          ? 'README_ZH-CN.md'
          : 'README.md'
      )
    })

    const showFeaturesAction = ctx.action.registerAction({
      name: 'plugin.status-bar-help.show-features',
      handler: () => ctx.doc.showHelp('FEATURES.md'),
      keys: null
    })

    const showShortcutsAction = ctx.action.registerAction({
      name: 'plugin.status-bar-help.show-shortcuts',
      handler: () => ctx.doc.showHelp('SHORTCUTS.md'),
      keys: null
    })

    const showPluginAction = ctx.action.registerAction({
      name: 'plugin.status-bar-help.show-plugin',
      handler: () => ctx.doc.showHelp('PLUGIN.md'),
      keys: null
    })

    ctx.statusBar.tapMenus(menus => {
      menus['status-bar-help'] = {
        id: 'status-bar-help',
        position: 'right',
        title: ctx.i18n.t('status-bar.help.help'),
        list: [
          {
            id: 'show-premium',
            type: 'normal',
            title: ctx.i18n.t('premium.premium'),
            hidden: ctx.args.FLAG_DEMO,
            onClick: () => ctx.showPremium()
          },
          {
            id: 'show-readme',
            type: 'normal',
            title: ctx.i18n.t('status-bar.help.readme'),
            onClick: () => ctx.action.getActionHandler(showHelpAction.name)()
          },
          {
            id: 'show-plugin',
            type: 'normal',
            title: ctx.i18n.t('status-bar.help.plugin'),
            onClick: () => ctx.action.getActionHandler(showPluginAction.name)()
          },
          {
            id: 'show-shortcuts',
            type: 'normal',
            title: ctx.i18n.t('status-bar.help.shortcuts'),
            onClick: () => ctx.action.getActionHandler(showShortcutsAction.name)()
          },
          {
            id: 'show-features',
            type: 'normal',
            title: ctx.i18n.t('status-bar.help.features'),
            onClick: () => ctx.action.getActionHandler(showFeaturesAction.name)()
          },
        ]
      }
    })
  }
} as Plugin
