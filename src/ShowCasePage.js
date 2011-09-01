var ShowCasePage = new Cuore.Class({
    Extends: Page,

    initializeServices: function() {
        this.addService(new ButtonService());
    },

    initializeComponents: function() {
        this.labelShowcase();
        this.inputShowcase();
        this.buttonShowcase();
        this.switchButtonShowcase();
        this.numericSelectorShowcase();
        this.collapsableShowcase();
        this.collapsableDecoratedShowcase();
        this.timeRangeShowcase();
        this.comboShowcase();
        this.nesteableShowcase();
    },

    labelShowcase: function() {
        var label = new LabelPanel("label.example");
        var noKey = new LabelPanel("key.not.solved");
        this.addComponent(label, "labelExample", true);
        this.addComponent(noKey, "labelExample2", true);
    },

    inputShowcase: function() {
        var input = new Input("input.label");

        var defaultValue = new Input("input.label");
        defaultValue.setValue("example value");

        var disabled = new Input("input.label");
        disabled.setValue("example value");
        disabled.disable()

        var password = new Input("input.label", "password");
        password.setValue("example value");

        this.addComponent(input, "inputExample", true);
        this.addComponent(defaultValue, "inputExample2", true);
        this.addComponent(disabled, "inputExample3", true);
        this.addComponent(password, "inputExample4", true);
    },

    buttonShowcase: function() {
        var button = new Button();
        var i18N = new Button("buttonName", "button.label");
        var disabled = new Button();
        disabled.disable();
        var image = new Button("imageButton", "button.label");

        this.addComponent(button, "buttonExample", true);
        this.addComponent(i18N, "buttonExample2", true);
        this.addComponent(disabled, "buttonExample3", true);
        this.addComponent(image, "buttonExample4", true);
    },

    switchButtonShowcase: function() {
        var button = new SwitchButton();
        var i18N = new SwitchButton("anyName", "switch.on", "switch.off");
        var image = new SwitchButton("imageSwitch", "switch.on", "switch.off");

        this.addComponent(button, "switchButtonExample", true);
        this.addComponent(i18N, "switchButtonExample2", true);
        this.addComponent(image, "switchButtonExample3", true);
    },

    numericSelectorShowcase: function() {
        var selector = new NumericSelector();
        var negatives = new NumericSelector("numeric.label");
        negatives.setLimInf(-10);
        negatives.setLimSup(10);
        negatives.setValue(3);
        negatives.setIncrementer(3);
        var stylable = new NumericSelector("numeric.label");
        stylable.disable();
        this.addComponent(selector, "numericSelectorExample", true);
        this.addComponent(negatives, "numericSelectorExample2", true);
        this.addComponent(stylable, "numericSelectorExample3", true);
    },

    collapsableShowcase: function() {
        var panel = new CollapsablePanel();
        var button = new SwitchButton("collapseButton", "collapse", "uncollapse");
        var handler = new SwitchCollapseAndUncollapseHandler();
        panel.addHandler("BUTTON_collapseButton_CLICKED", handler);

        panel.uncollapse();
        panel.setText("Lorem ipsum dolor sit amet,consectetur adipiscing elit. Pellentesque vulputate congue elementum. Sed iaculis dapibus justo, at hendrerit neque pharetra et. Pellentesque vehicula, urna at vehicula tempus, leo odio posuere ligula, ac posuere odio nisi quis nulla. Fusce non odio sit amet ante iaculis lobortis eget at odio. Pellentesque venenatis metus a neque tincidunt  ");

        this.addComponent(panel, "collapsableExample", true);
        this.addComponent(button, "collapsableExample2", true);
    },

    collapsableDecoratedShowcase: function() {
        var panel = new CollapsablePanel();
        var button = new SwitchButton("collapseDecoratedButton", "collapse", "uncollapse");
        var handler = new SwitchCollapseAndUncollapseHandler();
        var text = 'Lorem ipsum dolor sit amet,consectetur adipiscing elit. Pellentesque vulputate congue elementum. Sed iaculis dapibus justo, at hendrerit neque pharetra et. Pellentesque vehicula, urna at vehicula tempus, leo odio posuere ligula, ac posuere odio nisi quis nulla. Fusce non odio sit amet ante iaculis lobortis eget at odio. Pellentesque venenatis metus a neque tincidunt  ';

        panel.uncollapse();
        panel.setText(text);

        var decoratedPanel = new CollapsableDecorator(panel);
        decoratedPanel.addHandler("BUTTON_collapseDecoratedButton_CLICKED", handler);

        this.addComponent(decoratedPanel, "collapsableDecoratedExample", true);
        this.addComponent(button, "collapsableDecoratedExample2", true);
    },

    timeRangeShowcase: function() {
        var control = new TimeRange("timerange.label");
        var grain = new TimeRange("timerange.label", 30);
        grain.setStartHour("4:00");
        grain.setEndHour("8:30");
        this.addComponent(control, "timeRangeExample", true);
        this.addComponent(grain, "timeRangeExample2", true);
    },

    comboShowcase: function() {
        var panel = new CollapsablePanel();
        var handler = new SwitchCollapseAndUncollapseHandler();
        panel.addHandler("BUTTON_comboCollapseButton_CLICKED", handler);

        var button = new SwitchButton("comboCollapseButton", "uncollapse", "collapse");
        var label = new LabelPanel("label.example");
        var input = new Input("input.label");
        var numeric = new NumericSelector("numeric.label");
        var range = new TimeRange("timerange.label");

        var printButton = new Button("print", "Print");
        var theHandler = new PrintHandler();
        printButton.addHandler("BUTTON_print_CLICKED", theHandler);


        this.addComponent(button, "comboExample", true);
        this.addComponent(panel, "comboExample", false);

        var host = panel.getUniqueID();
        this.addComponent(label, host, false);
        this.addComponent(input, host, false);
        this.addComponent(numeric, host, false);
        this.addComponent(range, host, false);
        this.addComponent(printButton, host, false);
    },

    nesteableShowcase: function() {
        var aNestableComponent = new NestableComponent();
        var label = new LabelPanel("label.example.nested");
        var input = new Input("input.labelnested");

        aNestableComponent.host(label);
        aNestableComponent.host(input);

        var panel = new CollapsablePanel();
        var button = new SwitchButton("collapseButtonNested", "collapse", "uncollapse");
        var handler = new SwitchCollapseAndUncollapseHandler();
        var panelText = 'Lorem ipsum dolor sit amet,consectetur adipiscing elit. Pellentesque vulputate congue elementum. Sed iaculis dapibus justo, at hendrerit neque pharetra et. Pellentesque vehicula, urna at vehicula tempus, leo odio posuere ligula, ac posuere odio nisi quis nulla. Fusce non odio sit amet ante iaculis lobortis eget at odio. Pellentesque venenatis metus a neque tincidunt  ';
        panel.addHandler("BUTTON_collapseButtonNested_CLICKED", handler);

        panel.uncollapse();
        panel.setText(panelText);

        aNestableComponent.host(panel);
        aNestableComponent.host(button);

        anotherNestableComponent = new NestableComponent();
        var buttonForInputApply = new Button("button.nested");
        anotherNestableComponent.host(buttonForInputApply);

        aNestableComponent.host(anotherNestableComponent);

        this.addComponent(aNestableComponent, "ExampleNested", true);
    },

});