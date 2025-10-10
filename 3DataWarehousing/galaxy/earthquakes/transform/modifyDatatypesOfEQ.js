







function modifyDatatypes(eq){
    if (eq.magnitude){
        eq.magnitude=parseFloat(eq.magnitude)
    }
    if (eq.depth){
        eq.depth=parseFloat(eq.depth)
    }
    if (eq.cdi){ //provides a community-based estimate of shaking
        eq.cdi=parseFloat(eq.cdi)
    }
    if (eq.gap){
        eq.gap=parseInt(eq.gap)
    }
    return eq;
}


const modifyDatatypesOfEQs = earthquakes => earthquakes.map(eq => modifyDatatypes(eq));

module.exports = { modifyDatatypesOfEQs }