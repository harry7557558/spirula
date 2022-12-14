// 3D Complex Function Grapher

const NAME = "spirula.complex3.";

const builtinFunctions = [
    ["csc(z)", "csc(z)"],
    ["tan(z)", "-tan(z)"],
    ["atanh(z)", "atanh(-z)"],
    ["Γ(z)", "gamma(z)"],
    ["Log Tower", "ln(z^-5)/5"],
    ["Five Pillars", "(-i-1)/(ln(z^5)^2)"],
    ["Three Forks", "1/lngamma(sqrt(4z^3))"],
    ["Five Needles", "csc(root(5,z^5)e^(iln(|z|)))"],
    ["Conjugate Multibrot", "f(x)=conj(x)^4+z;g(z)=f(f(f(z;0.2/ln(g(z/2)+1"],
    ["Rainbow Mandelbrot", "#&#32;mathy&#32;part;f(x)=x^2+z;g(z)=f(f(f(f(f(f(f(z;s=ln(ln(1/|g(z/3-0.6)|)-1);#&#32;artistic&#32;part;tanh(1/|re(s)|)exp(iarg(sin(s)))"],
];


document.body.onload = function (event) {
    console.log("onload");

    // init built-in functions
    initBuiltInFunctions(builtinFunctions);

    // init parser
    initMathFunctions(rawMathFunctionsShared.concat(rawMathFunctionsC));
    _mathFunctions['zeta'][1].glsl = "mc_zeta_fast(%1)";
    //_mathFunctions['logzeta'][1].glsl = _mathFunctions['lnzeta'][1].glsl = "mc_lnzeta_fast(%1)";
    IndependentVariables = {
        'x': "mf_z()",
        'z': "mf_z()",
        'i': "mc_i()",
        'j': "mc_i()"
    };

    // init parameters
    initParameters([
        new GraphingParameter("sHz", "select-hz"),
        new GraphingParameter("sStep", "select-step"),
        new GraphingParameter("bLight", "checkbox-light"),
        new GraphingParameter("bGrid", "checkbox-grid"),
        new GraphingParameter("bDiscontinuity", "checkbox-discontinuity"),
        new GraphingParameter("cLatex", "checkbox-latex"),
        new GraphingParameter("cAutoUpdate", "checkbox-auto-compile"),
        new UniformSlider("rTheta", "slider-theta", -0.5 * Math.PI, 1.5 * Math.PI, Math.PI / 6.0),
        new UniformSlider("rPhi", "slider-phi", 0, Math.PI, Math.PI / 6.0),
        new UniformSlider("rZScale", "slider-zscale", 0.01, 0.99, 0.5),
        new UniformSlider("rBrightness", "slider-brightness", 0.01, 0.99, 0.6),
    ]);
    UpdateFunctionInputConfig.complexMode = true;
    UpdateFunctionInputConfig.equationMode = false;
    UpdateFunctionInputConfig.warnNaN = false;
    UpdateFunctionInputConfig.warnNumerical = true;

    // init viewport
    resetState({
        rz: 0.15 * Math.PI,
        rx: -0.35 * Math.PI,
        scale: 0.2
    }, false);

    // main
    initMain([
        "../shaders/vert-pixel.glsl",
        "../shaders/complex-zeta.glsl",
        "../shaders/complex.glsl",
        "frag-premarch.glsl",
        "../shaders/frag-pool.glsl",
        "frag-raymarch.glsl",
        "../shaders/frag-imggrad.glsl",
        "../shaders/frag-aa.glsl"
    ]);
};