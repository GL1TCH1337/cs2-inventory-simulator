/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { english } from "./english";

export const brazilian = {
  ...english,
  JavaScriptRequired:
    "JavaScript está desativado. Por favor, habilite-o e atualize a página.",
  SyncWarnText:
    "Você não está autenticado, suas mudanças não serão sincronizadas.",
  SyncErrorTitle: "Erro de sincronização",
  SyncErrorDesc: "Não foi possível sincronizar as suas mudanças.",
  SyncErrorContinue: "Tentar novamente",
  HeaderInventoryLabel: "Inventário",
  HeaderCraftLabel: "Criar Item",
  HeaderSettingsLabel: "Configurações",
  HeaderSignInLabel: "Entrar e sincronizar",
  HeaderSignOutLabel: "Sair",
  HeaderSignedInAsLabel: "Entrou como",
  APIPageHeader: "API para programadores",
  CraftSelectHeader: "Criando um item...",
  CraftConfirmHeader: "Confirmar criação",
  CraftSearchPlaceholder: "Procurar um item...",
  CategoryPistol: "Pistola",
  CategorySMG: "Submetralhadora",
  CategoryHeavy: "Arma Pesada",
  CategoryKnife: "Faca",
  CategoryGlove: "Luva",
  CategorySticker: "Adesivo",
  CategoryAgent: "Agente",
  CategoryPatch: "Emblema",
  CategoryEquipment: "Equipamento",
  CategoryMusicKit: "Kit de Música",
  CategoryPin: "Broche",
  CategoryCase: "Caixa",
  CategoryKey: "Chave",
  CategoryTool: "Ferramenta",
  CategoryGraffiti: "Grafite",
  EditorStickers: "Adesivos",
  EditorNametagPlaceholder: "Digite um nome...",
  EditorQuantity: "Qtd.",
  EditorReset: "Redefinir",
  EditorRandom: "Aleatório",
  EditorCraft: "Criar",
  EditorSave: "Salvar",
  EditorCancel: "Cancelar",
  EditorStickerWear: "Desgaste",
  StickerPickerHeader: "Escolha um adesivo...",
  StickerPickerSearchPlaceholder: "Procurar adesivo...",
  StickerPickerFilterPlaceholder: "Filtrar por categoria...",
  StickerPickerRemove: "Remover",
  InventoryNoItemsToDisplay: "Nenhum item para exibir",
  InventorySelectAnItem: "Selecionar item para usar com:",
  InventorySelectItemToRetrieve: "Selecione quais itens retirar",
  InventorySelectItemToDeposit: "Selecione quais itens guardar",
  InventorySelectInspectContents: "Inspecionando o conteúdo de",
  InventoryItemEquip: "Equipar",
  InventoryItemEquipT: "Equipar T",
  InventoryItemEquipCT: "Equipar CT",
  InventoryItemEquipBothTeams: "Equipar Ambas Equipes",
  InventoryItemUnequip: "Desequipar",
  InventoryItemUnequipT: "Desequipar T",
  InventoryItemUnequipCT: "Desequipar CT",
  InventoryItemUnlockContainer: "Destrancar recipiente",
  InventoryItemRename: "Renomear",
  InventoryItemDelete: "Excluir",
  InventoryItemTeam: "Equipe:",
  InventoryItemTeamAny: "Qualquer",
  InventoryItemTeamT: "Terrorista",
  InventoryItemTeamCT: "Contraterrorista",
  InventoryItemContainsOne: "Contém um dos seguintes itens:",
  InventoryItemRareItem: "ou um item especial e extremamente raro!",
  InventoryItemStatTrakDesc:
    "Este item possui a tecnologia StatTrak™, que registra certas estatísticas quando equipado.",
  InventoryItemStatTrakCount: "Vítimas confirmadas via StatTrak™",
  InventoryApplySticker: "Aplicar adesivo",
  InventoryScrapeSticker: "Remover adesivo",
  InventoryItemUseStorageUnit: "Começar a usar unidade",
  InventoryItemRenameStorageUnit: "Renomear",
  InventoryItemStorageUnitInspect: "Inspecionar",
  InventoryItemStorageUnitRetrieve: "Retirar itens",
  InventoryItemStorageUnitDeposit: "Guardar itens",
  InventoryItemStorageUnitEmptyTitle: "Unidade de armazenamento vazia",
  InventoryItemStorageUnitEmptyBody:
    "Esta unidade de armazenamento permite armazenar até {1} itens além da capacidade do seu inventário. A unidade de armazenamento selecionada está vazia. A qualquer momento, é possível mover itens do seu inventário para a unidade, retirá-los dela ou usá-la para organizar as suas coleções.",
  InventoryItemSwapStatTrak: "Abrir Ferramenta de Troca StatTrak™",
  InventoryItemEdit: "Editar",
  ItemSwapStatTrakUse: "Ferramenta de Troca StatTrak™",
  ItemSwapStatTrakDesc:
    "Este item troca as contagens StatTrak™ de dois itens do mesmo tipo.",
  ItemSwapStatTrakWarn:
    "Ferramentas de Troca StatTrak™ só podem ser usadas uma vez",
  ItemSwapStatTrakAccept: "Aceitar",
  ItemSwapStatTrakClose: "Fechar",
  ModelAgent: "Agente",
  ModelGlove: "Luva",
  ModelKnife: "Faca",
  ModelMusicKit: "Kit de Música",
  ModelPatch: "Emblema",
  ModelPin: "Broche",
  ModelSticker: "Adesivo",
  SettingsHeader: "Configurações",
  SettingsLanguage: "Idioma",
  SettingsBackground: "Plano de Fundo",
  SettingsBackgroundRandom: "Aleatório",
  SettingsStatsForNerds: "Estatísticas para Nerds",
  SettingsHideFreeItems: "Ocultar Itens Gratuitos",
  SettingsRemoveAllItems: "Remover todos os itens do meu inventário",
  SettingsConfirmRemoveAllItems: `Tem certeza de que deseja remover todos os itens do seu inventário?\n\nESSA AÇÃO NÃO PODE SER DESFEITA.`,
  SettingsSave: "Salvar",
  CaseUnlockContainer: "Destrancar recipiente",
  CaseUnlock: "Destrancar",
  CaseOnceWarn: "Este recipiente só pode ser aberto uma vez",
  CaseClose: "Fechar",
  CaseRareItem: "★ Item raro e especial ★",
  CaseContainsOne: "Contém um dos seguintes itens:",
  CaseUse: "Usar",
  RenameUse: "Usar Etiqueta de Nome",
  RenameEnterName: "Inserir novo nome para:",
  RenameWarn: "Etiquetas de Nome só podem ser usadas uma vez",
  RenameCancel: "Cancelar",
  RenameRename: "Renomear",
  RenameStorageUnitUse: "Personalize a sua unidade de armazenamento",
  RenameStorageUnitEnterName: "Inserir novo nome para:",
  RenameStorageUnitFirstNameWarn:
    "Dê um nome descritivo para a unidade de armazenamento e use-a para guardar os seus itens.",
  RenameStorageUnitNewNameWarn:
    "Dê um novo nome descritivo para a unidade de armazenamento.",
  RenameStorageUnitClose: "Fechar",
  RenameStorageUnitRename: "Personalizar",
  ApplyStickerUse: "Usar adesivo",
  ApplyStickerUseOn: "Usar em",
  ApplyStickerWarn: "Um adesivo pode ser aplicado apenas uma vez",
  ApplyStickerCancel: "Cancelar",
  ScrapeStickerUse: "Remover Adesivo",
  ScrapeStickerWarn: "Remover um adesivo de",
  ScrapeStickerRemove: "Remover adesivo",
  ScrapeStickerRemoveDesc:
    "Remover este adesivo mais uma vez o removerá do item, fazendo com que seja destruído.",
  ScrapeStickerCancel: "Cancelar",
  ScrapeStickerClose: "Fechar"
};
